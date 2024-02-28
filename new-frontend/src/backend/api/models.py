from api import db

class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    nhs_number = db.Column(db.String(20))
    is_form_for_self = db.Column(db.Boolean)
    conditions = db.Column(db.Text)
    generated_response = db.Column(db.Text)
    priority_level = db.Column(db.Integer)
    promptno = db.Column(db.Integer)
    vitals = db.relationship('Vitals', backref='patient', lazy=True)


    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'nhsNumber': self.nhs_number,
            'isFormForSelf': self.is_form_for_self,
            'conditions': self.conditions,
            'generatedResponse': self.generated_response,
            'priorityLevel': self.priority_level,
            'promptno': self.promptno
        }
class Vitals(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    systolic_blood_pressure = db.Column(db.Integer)
    heart_rate = db.Column(db.Integer)
    respiratory_rate = db.Column(db.Integer)
    oxygen_saturation = db.Column(db.Integer)
    has_supplementary_o2_device = db.Column(db.Boolean)
    temperature = db.Column(db.Float)
    gcs = db.Column(db.Integer)
    responsiveness = db.Column(db.String(50))
    equal_pupils = db.Column(db.Boolean)
    responsive_to_light = db.Column(db.Boolean)
    heart_beat_rhythm = db.Column(db.String(50))
    dehydration = db.Column(db.Boolean)
    risk_score = db.Column(db.Integer)
    monitoring_instructions = db.Column(db.String(200))
    detailed_diagnosis = db.Column(db.Text)

    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), nullable=False)

    def to_json(self):
        return {
            'id': self.id,
            'systolicBloodPressure': self.systolic_blood_pressure,
            'heartRate': self.heart_rate,
            'respiratoryRate': self.respiratory_rate,
            'oxygenSaturation': self.oxygen_saturation,
            'hasSupplementaryO2Device': self.has_supplementary_o2_device,
            'temperature': self.temperature,
            'gcs': self.gcs,
            'responsiveness': self.responsiveness,
            'equalPupils': self.equal_pupils,
            'responsiveToLight': self.responsive_to_light,
            'heartBeatRhythm': self.heart_beat_rhythm,
            'dehydration': self.dehydration,
            'riskScore': self.risk_score,
            'monitoringInstructions': self.monitoring_instructions,
            'detailedDiagnosis': self.detailed_diagnosis
        }
