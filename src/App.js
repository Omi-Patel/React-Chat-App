import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Container, VStack, Input, HStack } from '@chakra-ui/react'
import Message from './Components/Message';
import { app } from './firebase'
import { onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { getFirestore, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore'


const auth = getAuth(app)
const db = getFirestore(app)

const logoutHandler = () => {
  signOut(auth)
}

const loginHandler = () => {
  const provider = new GoogleAuthProvider()

  signInWithPopup(auth, provider)
}



function App() {
  const [user, setUser] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

  const divForScroll = useRef(null)

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp()
      })

      setMessage("")
      divForScroll.current.scrollIntoView({ behavior: "smooth" })

    } catch (error) {
      alert(error)
    }
  }



  useEffect(() => {
    const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"))

    const unsubscribe = onAuthStateChanged(auth, (data) => {
      // console.log(data);
      setUser(data)
    })

    const unsubscribeForMessage = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((item) => {
        const id = item.id;
        return { id, ...item.data() }
      }));
    })

    return () => {
      unsubscribe()
      unsubscribeForMessage()
    }
  }, []);

  return (
    <Box bg={'red.50'}>
      {
        user ? (
          <Container h={'100vh'} bg={'#004d4d'}>
            <VStack h={'full'} paddingY={'4'}>
              <Button onClick={logoutHandler} bg={'blue.300'} colorScheme={'red'} w={'full'}
                fontSize={'larger'}
              >Logout</Button>

              <VStack h={'full'} w={'full'} overflowY={'auto'} css={{
                "&::-webkit-scrollbar": {
                  display: "none"
                }
              }}>

                {
                  messages.map(item => (
                    <Message key={item.id} user={item.uid === user.uid ? "me" : "other"} text={item.text} uri={item.uri} />
                  ))
                }
                <div ref={divForScroll}></div>

              </VStack>


              <form onSubmit={submitHandler} style={{ width: "100%" }}>
                <HStack>
                  <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Enter a Message...' bg={'#003366'} fontWeight={'600'} color={'#b3d9ff'}  textTransform={'capitalize'} />

                  <Button type='submit' colorScheme='green'
                    fontSize={'larger'} boxShadow={'0px 0px 10px cyan'}
                  >Send</Button>
                </HStack>
              </form>
            </VStack>
          </Container>
        ) : <VStack bg={'white'} justifyContent={'center'} h={'100vh'}>
          <Button onClick={loginHandler} colorScheme='blue'>Sign In With Google</Button>
        </VStack>
      }
    </Box>
  );
}

export default App;
