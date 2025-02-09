# Dota2PersonalAnalytics

## Description

The project is designed to provide personal assistance in playing and developing Dota2 using various IT tools and analytics.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## Description

To be honest, I'm tired of the fact that there are many resources that aggregate statistics, analytics, and other information on how to play Dota2. However, I don't agree with all the concepts. Therefore, this project is my interpretation of how player statistics and various key heroes/items should be analyzed.

The main point is that the project will evolve as new functions are needed while playing Dota2.

Currently, only the functionality for training a model that should identify who was picked based on a screenshot from the draft moment has been implemented. After that, it will suggest who to pick better in Dota+ based not only on raw statistics but also on the initial potential of the hero relative to his abilities. For example, how Legion Commander can counter Bristleback due to his ultimate. Also, for the time being, it is planned to compile builds relative to the draft.

The most important thing is to note that I am a beginner in developing AI models. Therefore, most of the code in the .py files will be written using different AI text generators.

Also, please note that the MVP writing of the program will also use AI text generators to get a working version with the necessary functionality as quickly as possible. After that, there will be manual debugging of the code and algorithm.

# Installation and Running the Project

## Prerequisites

- [Node.js](https://nodejs.org/) (version 18+)
- [Python](https://www.python.org/) (version 3.8+)
- [Git](https://git-scm.com/)
- [TensorFlow](https://www.tensorflow.org/)
- [Pandas](https://pandas.pydata.org/)
- [NumPy](https://numpy.org/)
- [Scikit-learn](https://scikit-learn.org/stable/)

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/A-I-SMBD/dota2personalAnalytics.git
   ```

2. **Navigate to the project directory:**

   ```sh
   cd dota2personalAnalytics
   ```

3. **Install Node.js dependencies:**

   ```sh
   npm install
   ```

4. **Install Python dependencies:**

   Please figure this out yourself. Sorry

5. **Run the Node.js server:**

   ```sh
   npm start
   ```

6. **Run the Python script to train the model:**

   ```sh
   python heroes-detection-model.generator.py
   ```

## Contributing

1. Fork the repository.
2. Clone the fork to your local machine.
3. Create a new branch for your changes.
4. Make your changes and create a pull request.

## License

The project is licensed under the MIT License. A full description of the license is available in the [LICENSE](LICENSE) file.