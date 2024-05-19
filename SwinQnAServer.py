from FlagEmbedding import FlagReranker
from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer, util
import pandas as pd
from flask_cors import CORS

import warnings
warnings.filterwarnings("ignore", category=FutureWarning,
                        module="huggingface_hub.file_download")

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Import Swinburne Frequently asked questions from a CSV file
faq_df = pd.read_csv('SwinFAQDataSet.csv')
faq_questions = faq_df['Question'].tolist()
faq_answers = faq_df['Answer'].tolist()

question_model = SentenceTransformer('sentence-transformers/all-mpnet-base-v2')
question_embeddings = question_model.encode(faq_questions)

# Load the re-ranker
question_reranker = FlagReranker('BAAI/bge-reranker-v2-m3', use_fp16=True)


def get_best_answer(user_question):
    user_question_embedding = question_model.encode(user_question)
    cosine_similarities = util.cos_sim(
        user_question_embedding, question_embeddings)
    similarity_scores = [cosine_similarities[0][i].item()
                         for i in range(len(cosine_similarities[0]))]

    sorted_indices = sorted(range(len(similarity_scores)),
                            key=lambda i: similarity_scores[i], reverse=True)
    possible_answers = [faq_answers[i] for i in sorted_indices]
    possible_questions = [faq_questions[i] for i in sorted_indices]

    if question_reranker.compute_score([possible_questions[0], user_question]) > 0:
        return possible_answers[0]
    else:
        return "Sorry, This Question is not in my scope"


@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.json
    if not data or 'question' not in data:
        return jsonify({'error': 'Invalid input'}), 400

    user_question = data['question']
    answer = get_best_answer(user_question)
    return jsonify({'answer': answer})


if __name__ == '__main__':
    app.run(debug=True)
