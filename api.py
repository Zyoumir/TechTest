from flask import Flask
from flask_restful import Resource, Api
import db

app = Flask(__name__)
api = Api(app)


class Documents(Resource):
    def get(self):
        try:
            documents = db.get_documents()
        except db.DatabaseError as e:
            return {'status': 500, 'errors': str(e)}, 500

        return {'status': 200, 'data': documents}, 200


api.add_resource(Documents, '/documents')

if __name__ == '__main__':
    app.run(debug=True, port=7003)