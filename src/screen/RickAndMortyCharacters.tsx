import React, { useState, useEffect } from 'react'
import { ActivityIndicator, View, Text, ListRenderItemInfo, ImageBackground, StyleSheet } from 'react-native'
import { FlatList, TouchableOpacity, TextInput } from 'react-native-gesture-handler'
import axios, { AxiosResponse } from 'axios'
import { Card, Input } from 'react-native-elements'
import { EvilIcons } from '@expo/vector-icons';

interface Character {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: {
        name: string,
        url: string
    },
    location: {
        name: string,
        url: string
    },
    image: string,
    episode: string[],
    url: string,
    created: string

}
type UrlString = null | string

interface Response<T> {
    info: {
        count: number,
        pages: number,
        next: UrlString
        prev: UrlString
    }
    results: T
}
const UsersFetching = (props: any) => {
    const [characters, setCharacters] = useState<Character[]>([])
    const [isNextPage, setIsNextPage] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [text, setText] = useState('')
    const { navigation } = props

    useEffect(() => {
        const getApi = async () => {
            if (!isNextPage) return
            try {
                if (page === 1) setLoading(true)
                const response = await axios.get<Response<Character[]>>(`https://rickandmortyapi.com/api/character/?page= ${page}`)
                setCharacters(page === 1 ? response.data.results : [...characters, ...response.data.results])
                setIsNextPage(!!response.data.info.next)
            } catch (error) {
                setError(true)
            } finally {
                if (page === 1) setLoading(false)
            }
        }
        getApi()
    }, [page])
    if (loading) {
        return <ActivityIndicator />
    }
    if (error) {
        return <View>
            <Text>HATA</Text>
        </View>
    }
    const footerIndicator = () => {
        return loading ? (
            <View
                style={{
                    paddingVertical: 20,
                }}>
                <ActivityIndicator animating size="small" />
            </View>
        ) : null
    };
    const renderItemConst = (element: ListRenderItemInfo<Character>) => {
        const character = element.item
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View>
                    <Card containerStyle={styles.card}>
                        {
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('RickAndMortyData', character)}>
                                        <ImageBackground source={{ uri: character.image }} style={styles.image}></ImageBackground>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 2, justifyContent: 'center' }}>
                                    <Text key={character.id} style={{ fontSize: 18, fontWeight: 'bold', color: '#FD6E05' }}
                                        onPress={() => navigation.navigate('RickAndMortyData', character)}>
                                        {character.name}</Text>
                                </View>
                            </View>
                        }
                    </Card>
                </View>

            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ justifyContent: 'flex-start' }}>
                <Input style={{ borderBottomColor: '#abb8c3', borderBottomWidth: 1 }}
                    leftIcon={{ type: 'evil-icons', name: 'search', color: '#abb8c3' }}
                    placeholder='write something to search'
                    onChangeText={text => setText(text)}
                    defaultValue={text}></Input>
                <View style={{ alignSelf: 'center' }}>
                    <TouchableOpacity style={{ backgroundColor: '#c6f2a4', borderWidth: 1, borderRadius: 10, width: 60, borderColor: '#abb8c3' }} onPress={() => { }} >
                        <Text style={{ letterSpacing: 2, textAlign: 'center' }}>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <FlatList data={characters} renderItem={renderItemConst} onEndReached={({ distanceFromEnd }) => {
                    {
                        setPage(
                            page + 1
                        );
                    }
                }} onEndReachedThreshold={0.5} ListFooterComponent={footerIndicator} keyExtractor = { (item, index) => index.toString() } />
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#F5F5F5',
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,

        borderRadius: 15
    },
    image: {
        width: 100,
        height: 100,
        overflow: 'hidden',
        borderRadius: 400 / 2
    }
})
export default UsersFetching