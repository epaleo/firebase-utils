![node](https://img.shields.io/npm/v/node.svg?logo=nodedotjs)
![npm](https://img.shields.io/npm/v/npm.svg?logo=npm)

# ![Firestore](../docs/images/firestore-logo.svg) Firestore Data Importer

This Node.js application imports all collections from JSON files into a Firestore database. It uses the Firebase Admin SDK and allows configuration through environment variables.

## Table of Contents

- [ Firestore Data Importer](#-firestore-data-importer)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Obtaining the Service Account Key](#obtaining-the-service-account-key)
  - [Usage](#usage)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 12 or later)
- npm (Node package manager)
- A Firebase project with Firestore enabled
- Service account key from your Firebase project

## Installation

  1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/firestore-data-importer.git
   cd firestore-data-importer
   ```

  2. **Install dependencies**:

   ```bash
   npm install
   ```

  3. **Create a `.env` file** in the root directory of the project and set the following environment variables:

   ```
   SERVICE_ACCOUNT_KEY=./path/to/your/serviceAccountKey.json
   OUTPUT_DIRECTORY=./output
   ```

   Replace `./path/to/your/serviceAccountKey.json` with the actual path to your service account key file.

## Configuration

- **`SERVICE_ACCOUNT_KEY`**: Path to the JSON file containing your Firebase service account key. This is required for authentication.
- **`OUTPUT_DIRECTORY`**: Directory where the JSON files are stored for import. The default is `./output`.

## Obtaining the Service Account Key

To obtain the service account key for your Firebase project, follow these steps:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your project.
3. In the left sidebar, click on "Project settings" (the gear icon).
4. Navigate to the "Service accounts" tab.
5. Click on the "Generate new private key" button.
6. A JSON file will be downloaded to your computer. This is your service account key. Keep it secure and do not share it publicly.

## Usage

1. **Run the import script**:

   ```bash
   node import-firestore.js
   ```

2. The application will read all JSON files from the specified output directory and import their contents into Firestore under the respective collection names.

