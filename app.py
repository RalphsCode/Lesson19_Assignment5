from flask import Flask, request, render_template, session, jsonify
from boggle import Boggle
# from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__) 

app.config['SECRET_KEY'] = "RalphsCode-123"
# debug = DebugToolbarExtension(app)

boggle_game = Boggle()
boggle_board = boggle_game.make_board()


@app.route('/home')
def home():
    boggle_game = Boggle()
    session['boggle-game'] = boggle_game
    boggle_board = boggle_game.make_board()
    session['boggle_board']=boggle_board 
    return render_template('home.html')

@app.route('/run_boggle_game')
def run_boggle_game():
    session['boggle_board']=boggle_board 
    return render_template('game.html')

@app.route('/process_guess')
def process_guess():
    guess = request.args.get('guess', 'No_Guess_Received')
    board = session['boggle_board']
    
    print('############ GUESS RECEIVED:', guess)
    output = boggle_game.check_valid_word(board, guess)
    return jsonify({'result': output})



    # if guess in boggle_game.words:
    #     print('^^^^^^^^^^^^^^', guess, 'FOUND IN WORDS FILE')
    # else:
    #     print('XXXXXXXXXXXXXXXXXXXXXX', guess, 'NOT FOUND IN WORDS FILE')
    # return '>>> Done processing the word <<<'