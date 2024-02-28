from api import app
from flask import request, jsonify
import json
from api.models import db, Patient, Vitals
from openai import OpenAI
from sqlalchemy import desc



client = OpenAI(api_key='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')

system_prompt = """
You are a triage assistant receiving input about the patient conditions who is in an A&E.
Diagnose him to the nurse. Use concise medical language. 
Then select only one of the following options of requiring the vital signs:
1.zero-urgency
2.low-urgency
3.medium-urgency
4.high-urgency
5.very high-urgency
generate a detailed diagnosis and a priority level of requiring the vital signs from the options above.
give me the response as json data with the following keys: diagnosis, priority_level (as number), detailed_diagnosis.
given the following patient conditions:
"""

@app.route('/')
def hello():
    return 'Hello, World!'


# get all patients
@app.route('/api/patients', methods=['GET'])
def get_patients():
    # sort patients by priority level descending order
    patients = Patient.query.order_by(desc(Patient.priority_level)).all()

    return jsonify([patient.to_json() for patient in patients])

@app.route('/api/patient/<int:id>', methods=['GET'])
def get_patient(id):
    patient = Patient.query.get(id)
    vitals = Vitals.query.filter_by(patient_id=id).first()

    return jsonify(patient=patient.to_json(), vitals=vitals.to_json() if vitals else {})



# This is the route that the frontend will use to send a message to the backend
@app.route('/api/generate_response', methods=['POST'])
def generate_response():
    try:
        # Get the JSON data from the request
        data = request.get_json()

        # get patient data from request
        patient_name = data.get('patientName')

        patient_nhs_number = data.get('nhsNumber')
        # check if nhs number exists in the database
        if Patient.query.filter_by(nhs_number=patient_nhs_number).first():
            return jsonify(error="NHS number already exists"), 400

        patient_for_self = data.get('isFormForSelf')
        patient_conditions = data.get('conditions')

        completion = client.chat.completions.create(
          model="gpt-3.5-turbo",
          messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": patient_conditions}
          ]
        )
        # Extract the generated text from the OpenAI response
        generated_text = completion.choices[0].message

        generated_text = json.loads(generated_text.content)

        generated_response = generated_text["detailed_diagnosis"]

        # Create a new patient object
        patient = Patient(
            name=patient_name,
            nhs_number=patient_nhs_number,
            is_form_for_self=patient_for_self,
            conditions=patient_conditions,
            generated_response=generated_response,
            priority_level=generated_text["priority_level"],
            promptno=1
        )

        # Add the patient to the database
        db.session.add(patient)
        db.session.commit()


        # Return the generated response as JSON
        return jsonify({"message": "Your data has been successfully submitted and will be reviewed by a nurse shortly."})

    except Exception as e:
        return jsonify(error=str(e)), 500
    
@app.route('/api/submit_vitals', methods=['POST'])
def submit_vitals():
        # try:
                data = request.get_json()
                print(data)

                patient_id = data.get('patientId')

                # get vitals from request
                systolic_blood_pressure = data.get('systolicBloodPressure')
                heart_rate = data.get('heartRate')
                respiratory_rate = data.get('respiratoryRate')
                oxygen_saturation = data.get('oxygenSaturation')
                has_supplementary_o2_device = data.get('hasSupplementaryO2Device')
                temperature = data.get('temperature')
                gcs = data.get('gcs')
                responsiveness = data.get('responsiveness')
                equal_pupils = data.get('equalPupils')
                responsive_to_light = data.get('responsiveToLight')
                heart_beat_rhythm = data.get('heartBeatRhythm')
                dehydration = data.get('dehydration')
                risk_score = data.get('riskScore')
                monitoring_instructions = data.get('monitoringInstructions')

                patient = Patient.query.get(patient_id)

                # patient.conditions + the submitted vitals as prompt to the GPT-3 model
                completion = client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": f"""
                         Patient Conditions: {patient.conditions},
                         Systolic Blood Pressure: {systolic_blood_pressure},
                         Heart Rate: {heart_rate},
                         Respiratory Rate: {respiratory_rate},
                         Oxygen Saturation: {oxygen_saturation},
                         Has Supplementary O2 Device: {has_supplementary_o2_device},
                         Temperature: {temperature},
                         GCS: {gcs},
                         Responsiveness: {responsiveness},
                         Equal Pupils: {equal_pupils},
                         Responsive to Light: {responsive_to_light},
                         Heart Beat Rhythm: {heart_beat_rhythm},
                         Dehydration: {dehydration},
                    """}
                    ]
                )

                generated_text = completion.choices[0].message
                generated_text = json.loads(generated_text.content)


                # create vitals object and add to database
                vitals = Vitals(
                        systolic_blood_pressure=systolic_blood_pressure,
                        heart_rate=heart_rate,
                        respiratory_rate=respiratory_rate,
                        oxygen_saturation=oxygen_saturation,
                        has_supplementary_o2_device=has_supplementary_o2_device,
                        temperature=temperature,
                        gcs=gcs,
                        responsiveness=responsiveness,
                        equal_pupils=equal_pupils,
                        responsive_to_light=responsive_to_light,
                        heart_beat_rhythm=heart_beat_rhythm,
                        dehydration=dehydration,
                        risk_score=risk_score,
                        monitoring_instructions=monitoring_instructions,
                        detailed_diagnosis=generated_text["detailed_diagnosis"],
                        patient_id=patient_id
                )
                patient.priority_level = risk_score
                patient.promptno=2 
                db.session.commit()
        

                db.session.add(vitals)
                db.session.commit()

                return jsonify({"message": "Vitals submitted successfully"})


@app.route('/api/discharge_patient/<int:id>', methods=['POST'])
def discharge_patient(id):
    print(id)
    try:
      patient = Patient.query.get(id)
      print(patient)
      # detele vitals data
      if patient.vitals:
        Vitals.query.filter_by(patient_id=id).delete()

      db.session.delete(patient)
      db.session.commit()

      return jsonify({"message": "Patient discharged successfully"})
    except Exception as e:
        return jsonify(error=str(e)), 500

    