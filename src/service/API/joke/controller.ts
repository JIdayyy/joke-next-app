import getAll from "src/service/API/joke/getAll";
import create from "src/service/API/joke/create";
import random from "src/service/API/joke/random";

const jokeController = {
    getAll,
    create,
    random,
};

export default jokeController;
