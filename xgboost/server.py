from concurrent import futures

import grpc
import prediction_pb2
import prediction_pb2_grpc

import model
import numpy as np

model = model.get_model()


class PredictorService(prediction_pb2_grpc.PredictorService):
    def Predict(self, request, context):
        print("Incoming request")
        pclass = request.pclass
        age = request.age
        fare = request.fare
        female = int(request.female)
        male = int(not request.female)
        input = np.array([[pclass, age, fare, female, male]])
        print(input)
        prediction = model.predict(input)[0]
        print("Prediction: ", prediction)
        return prediction_pb2.Prediction(survive=bool(prediction))


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    prediction_pb2_grpc.add_PredictorServiceServicer_to_server(
        PredictorService(), server)
    server.add_insecure_port("0.0.0.0:5500")
    print("Listening on port 5500")
    server.start()
    server.wait_for_termination()


if __name__ == "__main__":
    serve()
