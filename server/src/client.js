import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const packageDef = protoLoader.loadSync("proto/prediction.proto", {});
const predictor = grpc.loadPackageDefinition(packageDef).predictor;

const client = new predictor.PredictorService(
  "localhost:5500",
  grpc.credentials.createInsecure(),
);

export default client;
