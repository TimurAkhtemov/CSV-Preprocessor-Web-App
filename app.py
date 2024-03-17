from flask import render_template, request, jsonify
from config import app, db, File
from processing_service.process import load_df
import pandas as pd
import os


with app.app_context():
    db.create_all()


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and file.filename.endswith('.csv'):
        upload_folder = 'uploads'
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)  # Create the directory if it doesn't exist
        filepath = os.path.join(upload_folder, file.filename)
        file.save(filepath)
        file_record = File(file_path=filepath)
        db.session.add(file_record)
        db.session.commit()
        
        # return jsonify({'message': 'File successfully uploaded'}), 200
        df, dataInfo = load_df(filepath) #load the file into a DataFrame
        print(dataInfo)
        return jsonify({'file_id': file_record.id, 'data': df.to_dict(orient='records'), 'dataInfo': dataInfo})
    else:
        return jsonify({'error': 'Invalid file format'}), 400

@app.route('/process', methods=['POST'])
def process_file():
    options = request.json
    file_id = options.get('file_id')  # Assume the file ID is sent in the request
    file_record = File.query.get(file_id)
    
    if not file_record or not os.path.exists(file_record.file_path):
        return jsonify({'error': 'File not found'}), 404

    df = load_df(file_record, options)

    # For demonstration, simply return the shape of the processed DataFrame
    # return jsonify({'message': 'Data processed', 'rows': df.shape[0], 'columns': df.shape[1]}), 200
    return jsonify(df.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(port=5500, debug=True)


