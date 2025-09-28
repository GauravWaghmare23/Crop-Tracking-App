import mongoose from 'mongoose';

export async function connect() {
    try {
        const mongoUrl = process.env.MONGODB_URL || 'mongodb+srv://gauravwaghmare:Nirvana95032@cluster0.unepsiq.mongodb.net/mynewdatabase?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(mongoUrl);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);

    }


}
