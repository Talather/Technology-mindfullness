import { initializeApp } from "firebase/app"
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  writeBatch,
  query,
  where,
  serverTimestamp,
  setDoc,
} from "firebase/firestore"

const apiKey = import.meta.env.VITE_API_KEY
const authDomain = import.meta.env.VITE_AUTH_DOMAIN
const projectId = import.meta.env.VITE_PROJECT_ID
const storageBucket = import.meta.env.VITE_STORAGE_BUCKET

const messagingSenderId = import.meta.env.VITE_MESSAGE_SENDER_ID
const appId = import.meta.env.VITE_APP_ID
const dbUrl = import.meta.env.VITE_DATABASE_URL

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  databaseURL: dbUrl,
}

initializeApp(firebaseConfig)

async function getUser() {
  try {
    const firebaseConfig = {
      apiKey: apiKey,
      authDomain: authDomain,
      projectId: projectId,
      storageBucket: storageBucket,
      messagingSenderId: messagingSenderId,
      appId: appId,
      databaseURL: dbUrl,
    }

    initializeApp(firebaseConfig)
    const db = getFirestore()

    const usersCollectionRef = collection(db, "users")

    const querySnapshot = await getDocs(usersCollectionRef)

    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Error fetching users:", error)
  }
}

async function createUser(userCreate) {
  try {
    userCreate = userCreate.userCreate

    const firebaseConfig = {
      apiKey: apiKey,
      authDomain: authDomain,
      projectId: projectId,
      storageBucket: storageBucket,
      messagingSenderId: messagingSenderId,
      appId: appId,
      databaseURL: dbUrl,
    }

    initializeApp(firebaseConfig)
    const db = getFirestore()
    const usersCollectionRef = collection(db, "users")
    const studentCollectionRef = collection(db, "students")

    const gradeCollectionRef = collection(db, "grades")







    // const gradeSnapshot = await getDocs(collection(db, "grades"))
    // const gradeDocsData = gradeSnapshot.docs.map((doc) => ({
    //   id: doc.id,
    //   ...doc.data(),
    // }))
    // console.log("usergrades", gradeDocsData)
    // const grades = gradeDocsData.filter(
    //   (item) => item.level === parseInt(userCreate.grade, 10)
    // )
    //  console.log("mmusergrades",  grades)

    
    
    

    const q = query(
      gradeCollectionRef,
      where("level", "==",
        // parseInt(
          userCreate.grade
        // )
      )
    )

    // Execute the query
    const querySnapshot = await getDocs(q)
    let grades=[]
    // Process and return the results
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        // console.log("Found grade:", doc.id, "=>", doc.data())
        grades.push({id:doc.id,...doc.data()})
      })
    } 
    console.log("zikka",grades)
    
    
    
    
    
    
    
    
    
    
    const gradeRef = await doc(db, "grades", grades[0]?.id)

    const schoolDocRef = await doc(db, "schools", userCreate.school)
    const studentQuerySnapshot = await addDoc(studentCollectionRef, {
      name: userCreate.name,
      email: userCreate.email,
      nameForSearchPurpose: userCreate.name.toLowerCase(),
      grade: gradeRef,
      school: schoolDocRef,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    const userDocRef = await doc(db, "users", studentQuerySnapshot.id) // Reference with a custom ID
    await setDoc(userDocRef, {
      name: userCreate["name"],
      email: userCreate["email"],
      role: "student",
      createdAt: serverTimestamp(),
      updateAt: serverTimestamp(),
    })

    return {
      id: userDocRef.id,
      path: userDocRef.path,
      grade: grades[0]?.id,
    }
  } catch (error) {
    console.error("Error fetching users:", error)
  }
}

async function getVideo(grade,school) {
  try {
    console.log("getvideo hit")
    const firebaseConfig = {
      apiKey: apiKey,
      authDomain: authDomain,
      projectId: projectId,
      storageBucket: storageBucket,
      messagingSenderId: messagingSenderId,
      appId: appId,
      databaseURL: dbUrl,
    }

    initializeApp(firebaseConfig)
    const db = getFirestore()

    const videoCollectionRef = collection(db, "videos")

    grade = doc(db, "grades", grade)
    school = doc(db, "schools", school)
    console.log("before grade query hit")
   
    const querySnapshot = await query(
      videoCollectionRef,
      where("grade", "==", grade),
      where("school", "==", school)
    )
    console.log("after grade query hit")

    console.log("ghikr", querySnapshot)

    if (querySnapshot) {
      const v = await getDocs(querySnapshot)
      const videos = v.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      return videos
    } else {
      return null
    }
  } catch (error) {
    console.error("Error fetching users:", error)
  }
}

async function getQuiz(video) {
  try {
    const firebaseConfig = {
      apiKey: apiKey,
      authDomain: authDomain,
      projectId: projectId,
      storageBucket: storageBucket,
      messagingSenderId: messagingSenderId,
      appId: appId,
      databaseURL: dbUrl,
    }

    initializeApp(firebaseConfig)
    const db = getFirestore()

    const quizCollectionRef = collection(db, "quizzes")
    const questionCollectionRef = collection(db, "questions")
    const answerCollectionRef = collection(db, "answers")
    const videoCollectionRef = collection(db, "videos")
    const videoDoc = doc(videoCollectionRef, video)

    const quizQuery = await query(
      quizCollectionRef,
      where("video", "==", videoDoc)
    )

    const queryquizSnapshot = await getDocs(quizQuery)
    const quizes = queryquizSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    const questionQuery = await query(
      questionCollectionRef,
      where("quiz", "==", doc(quizCollectionRef, quizes[0].id))
    )

    const questionSnapshot = await getDocs(questionQuery)
    const questions = questionSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    for (let i = 0; i < questions.length; i++) {
      const answerQuery = await query(
        answerCollectionRef,
        where("question", "==", doc(questionCollectionRef, questions[i].id))
      )

      const answerSnapshot = await getDocs(answerQuery)
      const answers = answerSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      answers.forEach((answer) => {
        answer.correct === true
          ? (questions[i].correctAnswer = answer.id)
          : null
      })
      questions[i].answers = answers
      questions[i][answers] = answers
    }

    quizes[0].questions = questions
    return { quiz: quizes }
  } catch (error) {
    console.error("Error fetching users:", error)
  }
}

async function createSubmittedQuiz(submittedQuizCreate) {
  try {
    const quiz = submittedQuizCreate.quiz
    const user = submittedQuizCreate.user

    const firebaseConfig = {
      apiKey: apiKey,
      authDomain: authDomain,
      projectId: projectId,
      storageBucket: storageBucket,
      messagingSenderId: messagingSenderId,
      appId: appId,
      databaseURL: dbUrl,
    }

    initializeApp(firebaseConfig)
    const db = getFirestore()

    const submittedQuizCollectionRef = collection(db, "submittedQuiz")
    const quizCollectionRef = collection(db, "quiz")
    const usersCollectionRef = collection(db, "users")
    submittedQuizCreate.quiz = doc(quizCollectionRef, quiz)
    submittedQuizCreate.user = doc(usersCollectionRef, user)

    const submittedQuiz = await addDoc(
      submittedQuizCollectionRef,
      submittedQuizCreate
    )

    return submittedQuiz
  } catch (error) {
    console.error("Error fetching users:", error)
  }
}

async function createResponses(responseCreates) {
  try {
    const firebaseConfig = {
      apiKey: apiKey,
      authDomain: authDomain,
      projectId: projectId,
      storageBucket: storageBucket,
      messagingSenderId: messagingSenderId,
      appId: appId,
      databaseURL: dbUrl,
    }

    initializeApp(firebaseConfig)
    const db = getFirestore()

    const batch = writeBatch(db)

    const answerCollectionRef = collection(db, "answer")
    const quizCollectionRef = collection(db, "quiz")
    const usersCollectionRef = collection(db, "users")

    responseCreates.forEach((item) => {
      item.quiz = doc(quizCollectionRef, item.quiz)
      item.answer = doc(answerCollectionRef, item.answer)
      item.user = doc(usersCollectionRef, item.user)

      const responseCollectionRef = collection(db, "responses")
      batch.set(doc(responseCollectionRef), item)
    })

    const responses = await batch.commit()

    return responses // Log retrieved user data
  } catch (error) {
    console.error("Error fetching users:", error)
  }
}

export {
  getUser,
  createResponses,
  createSubmittedQuiz,
  createUser,
  getQuiz,
  getVideo,
}
