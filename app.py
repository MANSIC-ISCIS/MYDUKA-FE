from flask import Flask, jsonify
from flask_cors import CORS

from extensions import db, jwt, ma, migrate
from config import Config


from routes.clerks_routes import clerk_bp
from routes.payment_routes import payment_bp
from routes.records_routes import records_bp
from routes.suppliers_routes import suppliers_bp
from routes.products_routes import products_bp


app = Flask(__name__)

app.config.from_object(Config)

# =========================================================
# INITIALIZE EXTENSIONS
# =========================================================

db.init_app(app)
jwt.init_app(app)
ma.init_app(app)
migrate.init_app(app, db)

with app.app_context():
    db.create_all()

CORS(app, origins="*", supports_credentials=True)


# =========================================================
# REGISTER BLUEPRINTS
# =========================================================


app.register_blueprint(clerk_bp)
app.register_blueprint(payment_bp)
app.register_blueprint(records_bp)
app.register_blueprint(suppliers_bp)
app.register_blueprint(products_bp)

@app.route("/")
def home():

    return jsonify({
        "message": "MyDuka API is running"
    })

if __name__ == "__main__":
    app.run(debug=True)
