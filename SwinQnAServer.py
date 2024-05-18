from FlagEmbedding import FlagReranker
from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer, util
import pandas as pd

app = Flask(__name__)

# Import Swinburn Frequently asked quetions from a csv file
df = pd.read_csv('SwinFAQDataSet.csv')
questions = df['Question'].tolist()
answers = df['Answer'].tolist()

model = SentenceTransformer('sentence-transformers/all-mpnet-base-v2')
embeddings = model.encode(questions)

# Load the re-ranker
reranker = FlagReranker('BAAI/bge-reranker-v2-m3', use_fp16=True)


def find_best_answer(user_question):
    q_embedding = model.encode(user_question)
    cos_sim = util.cos_sim(q_embedding, embeddings)
    val = [cos_sim[0][i].item() for i in range(len(cos_sim[0]))]

    sorted_indices = sorted(
        range(len(val)), key=lambda i: val[i], reverse=True)
    p_answer = [answers[i] for i in sorted_indices]
    p_question = [questions[i] for i in sorted_indices]

    if reranker.compute_score([p_question[0], user_question]) > 0:
        return p_answer[0]
    else:
        return "Sorry, This Quetion is no in my scope"


@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.json
    if not data or 'question' not in data:
        return jsonify({'error': 'Invalid input'}), 400

    user_question = data['question']
    answer = find_best_answer(user_question)
    return jsonify({'answer': answer})
