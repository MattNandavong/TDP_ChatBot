from flask import Flask, request, jsonify, send_from_directory
import os
from transformers import RobertaTokenizer, RobertaForQuestionAnswering, pipeline
import torch
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize message history as an empty list
message_history = []


@app.route('/')
def index():
    return send_from_directory(os.path.join(app.root_path, ''), 'index.html')


@app.route('/query', methods=['POST'])
def process_query():
    global message_history  # Use global variable to store message history
    # load QA model API
    get_answer = pipeline(task="question-answering", model="MattNandavong/QA-roberta-model3")

    # load context
    context = "We can potentially offer students unit exemptions for our undergraduate courses, based on diploma and higher education qualifications undertaken within the last 10 years. Swinburne Online takes domestic students for both degrees and TAFE diplomas from anywhere in Australia. International students are also accepted for our degrees. enrolments close approximately 10 days before the start of each teaching period. Our teaching periods run three times a year, from March to June, July to October and November to February. It is expected that applicants have proficient English skills. We recommend the below levels in an English language test such as IELTS or TOEFL to ensure you are successful at university It is expected that applicants have proficient English skills. You should have a bachelor degree or equivalent (at least three years) studied in English, or have completed year 12 English in Australia. You must meet the below levels in an English language test such as IELTS, ISLPR or PEAT. recent Year 12 students must apply through VTAC for Swinburne courses for the March intake. However you may apply for Swinburne Online's July or November intakes. If you are unsure which qualification is most relevant to you, speak to a Course Consultant for some advice or see our Levels of Education FAQ section. If you’re unsure about whether you’ll be eligible to study with Swinburne, it’s definitely worth calling our team of course consultants on 1300 069 765 or +61 3 9956 0777 if you are calling from overseas. Our team of Course Consultants will normally get in touch with you within two working days of you submitting your application with an outcome. Students wishing to study with us, simply need to complete an application form and submit it to Swinburne Online. Because you will be studying a degree online, all of our support systems are available over the phone or online. Yes, Swinburne Online accept applications from international students for our higher education courses. You can study at Swinburne Online from any state or territory in Australia"

    data = request.get_json()
    query = data['query']
    # get the most likely answer
    answer = get_answer(context=context, question=query)['answer']

    # Add user query and model answer to message history
    message_history.append({'user_query': query, 'model_answer': answer})

    # Return both answer and message history
    return jsonify({'answer': answer, 'message_history': message_history})


if __name__ == '__main__':
    app.run(debug=True)
