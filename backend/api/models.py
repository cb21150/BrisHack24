from api import db

class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    nhs_number = db.Column(db.String(20))
    is_form_for_self = db.Column(db.Boolean)
    conditions = db.Column(db.Text)
    generated_response = db.Column(db.Text)
    priority_level = db.Column(db.Integer)


    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'nhsNumber': self.nhs_number,
            'isFormForSelf': self.is_form_for_self,
            'conditions': self.conditions,
            'generatedResponse': self.generated_response,
            'priorityLevel': self.priority_level
        }