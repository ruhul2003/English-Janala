const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri =
      process.env.MONGODB_URI ||
      'mongodb+srv://hire_loop_db_user:wwiIRfECMOKwPwpl@tilux-server.cltfmst.mongodb.net/Khoj?appName=Tilux-server';

    const conn = await mongoose.connect(uri);

    console.log(`✅ MongoDB Connected to database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
