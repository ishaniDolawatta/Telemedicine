# Telemedicine


# Context and goal

Telemedicine is a cloud-based solution using AWS services enabled mobile application which allows users to connect with a physician. Using natural language processing patients will be connected to the most relevant physician. 

The mobile app will enable vocal communication with the patient and physician.

The physician’s vocal instructions will be analyzed and converted to the text.

The resulting text will be used to extract medical information such as medical conditions, medications, dosages, tests, treatments, and procedures.

Extracted medical information is used to present meaningful prescriptions as a result. 


# Preview
![Preview](http://demo/2.jpg)


# Running the project

- Clone this project
```
git clone < project-url.git >
```

- [Install NodeJS](https://nodejs.org/en/) on your computer.

- [Install yarn](https://yarnpkg.com/en/docs/install) on your computer
> Yarn is a dependency manager built by facebook and google. It is a more efficient and reliable (thanks to yarn.lock) alternative of npm.

- Launch ``` yarn ``` command in a terminal opened in the project folder.
> This command will look into the *package.json* file and install all the dependencies listed here.

- Install react-native-cli globally on your computer
```
yarn global add react-native-cli