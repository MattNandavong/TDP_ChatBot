from flask import Flask, request, jsonify, send_from_directory
import os
from transformers import RobertaTokenizer, RobertaForQuestionAnswering
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

    # Load pre-trained BERT model and tokenizer
    model_name = "MattNandavong/QA_model8-test"
    tokenizer = RobertaTokenizer.from_pretrained(model_name)
    model = RobertaForQuestionAnswering.from_pretrained("MattNandavong/QA-roberta-model")
    context = "While a bachelor's degree is a common requirement for MBA programs, some institutions offer pathways for individuals without a bachelor's degree based on relevant work experience or related graduate certificates. We can potentially offer students unit exemptions for our undergraduate courses, based on diploma and higher education qualifications undertaken within the last 10 years. Previous studies don’t necessarily need to be related to the field you’re looking to pursue with us to make you eligible for exemptions. We can also award unit exemptions towards our postgraduate courses, where previously completed studies are considered academically equivalent (i.e. postgraduate level) and have been completed within the last 10 years. TAFE students may be eligible to receive credit for previous study and work experience. If you’ve completed units or certificates at another recognised institute or training organisation, you may be able to apply for a credit transfer. Alternatively, if you have significant work experience related to your studies, you can apply to have this recognised through recognition of prior learning. Swinburne Online takes domestic students for both degrees and TAFE diplomas from anywhere in Australia. International students are also accepted for our degrees, although some differences to their payment processes will apply.  If you are applying to study a degree at Swinburne Online, enrolments close approximately 10 days before the start of each teaching period. Our teaching periods run three times a year, from March to June, July to October and November to February. For TAFE students, you can enrol at any time and begin your self-paced studies at a variety of start dates that suit you. For full details about start dates, visit our Key date page.  It is expected that applicants have proficient English skills. We recommend the below levels in an English language test such as IELTS or TOEFL to ensure you are successful at university study. It is expected that applicants have proficient English skills. You should have a bachelor degree or equivalent (at least three years) studied in English, or have completed year 12 English in Australia. You must meet the below levels in an English language test such as IELTS, ISLPR or PEAT to ensure you are successful. "

    data = request.get_json()
    query = data['query']

    # Tokenize question and context with truncation
    inputs = tokenizer(query, context, truncation=True, return_tensors="pt")

    # Perform question answering inference
    outputs = model(**inputs)
    start_logits = outputs.start_logits
    end_logits = outputs.end_logits

    # Get the most likely answer
    start_index = torch.argmax(start_logits)
    end_index = torch.argmax(end_logits)
    answer = tokenizer.convert_tokens_to_string(
        tokenizer.convert_ids_to_tokens(inputs["input_ids"][0][start_index:end_index + 1]))

    # Add user query and model answer to message history
    message_history.append({'user_query': query, 'model_answer': answer})

    # Return both answer and message history
    return jsonify({'answer': answer, 'message_history': message_history})


if __name__ == '__main__':
    app.run(debug=True)
