import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const packageDef = protoLoader.loadSync("proto/prediction.proto", {});
const predictor = grpc.loadPackageDefinition(packageDef).predictor;

const client = new predictor.PredictorService(
  process.env.SERVER_ADDRESS || "localhost:5500",
  grpc.credentials.createInsecure(),
);

export default client;
