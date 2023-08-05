import React from 'react'
import { HStack, Avatar, Text } from '@chakra-ui/react'

const Message = ({ text, uri, user = "other" }) => {
    return (
        <HStack alignSelf={user === 'me' ? 'flex-end' : 'flex-start'} bg={user === 'me' ? '#1affff' : '#ccffff'}
            color={'blackAlpha.900'} fontWeight={'medium'}
            fontSize={'large'} borderRadius={user === 'me' ? '20px 20px 0px 20px' : '20px 20px 20px 0px'} 
            paddingX={"3"} paddingY={'2'} textTransform={'capitalize'}
            boxShadow={'0px 0px 5px #b3ffb3'} 
        >

            {
                user === 'other' && <Avatar src={uri} />
            }
            <Text>
                {text}
            </Text>
            {
                user === 'me' && <Avatar src={uri} h={'8'} w={'8'} />
            }
        </HStack>
    )
}

export default Message
