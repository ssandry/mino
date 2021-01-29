from app import app

with open("./data/collections.json") as json_data:
    collections = json.load(json_data) 

@app.route("/api/v.1.0/get-collections", methods=["GET"])
@app.route("/api/get-collections", methods=["GET"])
def get_collections():
    return jsonify({ "collections": collections })


@app.route("/api/v.1.0/get-collections/<int:collection_id>", methods=["GET"])
@app.route("/api/get-collections/<int:collection_id>", methods=["GET"])
def get_collection(collection_id):
    return collections[collection_id]
