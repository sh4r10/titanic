import pandas as pd
import numpy as np
import os
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier


def train():
    print("Training model")
    data_df = pd.read_csv('data/train.csv')
    y = data_df.pop('Survived')
    data_df.drop(columns=['PassengerId', 'Name', 'Embarked',
                 'Ticket', 'Cabin', 'SibSp', 'Parch'], inplace=True)
    data_df = pd.get_dummies(data_df, columns=['Sex'], dtype=int)
    data_df['Age'].fillna(data_df['Age'].mean(), inplace=True)
    data_x = data_df.to_numpy()
    data_y = y.to_numpy()
    X_train, xt, y_train, yt = train_test_split(data_x, data_y, train_size=0.6)
    X_cv, X_test, y_cv, y_test = train_test_split(xt, yt, test_size=0.5)
    print("Training Set:", X_train.shape, y_train.shape)
    print("Cross-Validation Set:", X_cv.shape, y_cv.shape)
    print("Testing Set:", X_test.shape, y_test.shape)
    bst = XGBClassifier(n_estimators=200, max_depth=10,
                        learning_rate=0.01, objective='binary:logistic')
    bst.fit(X_train, y_train)
    train_preds = bst.predict(X_train)
    train_accuracy = (train_preds == y_train).astype(int)
    train_accuracy = np.sum(train_accuracy)/len(y_train)
    print("Training Accuracy:", train_accuracy)
    cv_preds = bst.predict(X_cv)
    cv_accuracy = (cv_preds == y_cv).astype(int)
    cv_accuracy = np.sum(cv_accuracy)/len(y_cv)
    print("Cross Validation Accuracy:", cv_accuracy)
    test_preds = bst.predict(X_test)
    test_accuracy = (test_preds == y_test).astype(int)
    test_accuracy = np.sum(test_accuracy)/len(y_test)
    print("Test Set Accuracy:", test_accuracy)
    bst.save_model("data/model.json")
    return bst


def load():
    print("Loading existing model")
    loaded = XGBClassifier()
    loaded.load_model("data/model.json")
    return loaded


def get_model():
    if (os.path.exists("data/model.json")):
        return load()
    return train()
