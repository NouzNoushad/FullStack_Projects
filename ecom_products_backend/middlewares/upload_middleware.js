import path from "path"
import multer from "multer"

export const uploadImageMiddleware = (req, res, next) => {
    // file storage
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/images')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + path.extname(file.originalname)
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    })

    // file filter
    const checkImageFile = (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null, true)
        } else {
            cb(new Error('Not an image! Please upload only images'))
        }
    }

    // multer 
    const upload = multer({
        storage,
        checkImageFile
    }).single('image')

    req.upload = upload
    next()
}

