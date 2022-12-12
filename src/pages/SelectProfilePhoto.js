import React from 'react'

const SelectProfilePhoto = () => {

    // const handleFile = (e) => {

    //     const files = e.target.files
    //     const fileReader = new FileReader()
    //     if(fileReader && files.length > 0){
    //       fileReader.readAsArrayBuffer(files[0])
    //       fileReader.onload = async function(){
    //         const imageData = fileReader.result
    //         const res = await setUserProfilePhoto(currentUser.uid, imageData)
            
    //         if(res){
    //           const tmpUser = currentUser
    //           tmpUser.profilePicture = res.metadata.fullPath
    //           await updateUser(tmpUser)
    //           setCurrentUser(tmpUser)
    //           const url = await getProfilePhoto(currentUser.profilePicture)
    //           setProfileUrl(url)
            
    //       }
    //     }
    // }}

  return (
    <div className="profilephoto">
        <input onChange={handleFile} type="file" id="file" hidden/>
        <label className="label-photo" htmlFor="file" >
            <FileUploadIcon fontSize="medium"/>
            <span>Upload Photo</span>
        </label>
    </div>
  )
}

export default SelectProfilePhoto