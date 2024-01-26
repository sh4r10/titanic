# Would you have survived on the titanic? 
Let the data decide your fate.
## Preview
![titanic](assets/titanic.gif)

## Getting started
The easiest way to get started with running the project is through using docker.
1. Clone the repository and cd to it   
`git clone https://github.com/sh4r10/titanic`  
`cd titanic`
2. Run docker compose  
`docker compose up`

## Components
The architecture of the project is divided into three components, the xgboost component responsible for creating predictions, the express.js backend and the solid.js frontend. 
This choice of architecture is purely for educational reasons. In a real world scenario, it would be better to use have the server and the model as the same service as the model is not very complex.
This can be done with flask or django.

### XGBoost
XGBoost is a decision tree algorithm. The model is trained using the train.csv dataset located in the `xgboost/data/` directory. The trained model is then used to make predictions based on the input data.
The model has a testing accuracy of 82%, it is possible to get a more accurate model by using additional parameters but for the sake of simplicity the model is set to train on the `passenger_class`, `fare`,
`age` and `gender` parameters. 

### Express.js Backend
A simple express.js backend acts as the gateway to the xgboost service. 
The model has two endpoints `/` and `/predict`.

### Solid.js 
The frontend of the application is built using Solid.js, a declarative JavaScript library for building user interfaces. 
The frontend communicates with the Node.js backend to request predictions and display them to the user

## Inter-service communication
The main reason for the architecture being as it is, has to do with learning gRPC. The system uses gRPC for inter-service communication. 
The XGBoost service exposes a gRPC server that allows other services to request predictions. 
The Node.js backend service acts as a gRPC client, making requests to the XGBoost service and serving the predictions to the frontend. 
The gRPC communication is defined in the prediction.proto file, which is used to generate the necessary Python and JavaScript code for the gRPC server and client, respectively.

## Docker
All the services, including the client are dockerized efficiently to support future hosting/scaling.
