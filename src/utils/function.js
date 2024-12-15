import { getVideo } from "../firebase"


const videoLoader = async ({ request }) => {

  const url = new URL(request.url)
  const grade = url.searchParams.get("grade")


 
  if (grade) {
    const video = await getVideo(grade)
  
    
    if (video) {
      return video[0] // Return video document data
    } else {
      throw new Error("Video not found")
    }
  } else {
    throw new Error("Grade not found")
  }
}

export { videoLoader }
