import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      try{
        cb(null, './images');
      } catch(error){
        console.log(`Error occured in destination of multer. Error: ${error.message}.`)
      }
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      try{
        cb(null, file.originalname + file.fieldname + '-' + uniqueSuffix);
      } catch(error){
        console.log('Error occured in file name of the multer. Error: ${error.message}.')
      }
    }
  })
  
export const upload = multer({ storage: storage });