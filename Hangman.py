from flask import Flask, render_template

app = Flask(__name__, static_folder='static')


@app.route('/')
def hello_world():
    return render_template("szubienica.html")


if __name__ == '__main__':
    app.run()
