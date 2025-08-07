import multer from 'multer'

const storage= multer.diskStorage({
	filename: function (req, file, cd) {
		cd(null, file.originalname)
	},
	destination: function (req, file, cb) {
		cb(null, './public/uploads'); 
	},
})

function fileFilter(req,file,cd) {
	const allowedFiles = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']
	if(!allowedFiles.includes(file.mimetype)) {
		cd(new Error('Only images are allowed.'),false)
	}else{
		cd(null, true)
	}
}

const upload = multer({storage:storage, fileFilter: fileFilter})
export default upload