import React, { useEffect, useState } from 'react'
import { Pressable } from 'react-native'
import styled from 'styled-components/native'
import ErrorPresent from '../../components/error'
import FloatingButton from '../../components/floatingButton'
import useApi from '../../hooks/api'
import PostCreateModal from './postCreateModal.component'
import Post from './postListItem.component'
import PostModal from './postModal.component'

const Wrapper = styled.View`
  flex: 1;
`

const List = styled.FlatList``

const InfoText = styled.Text`
  font-size: 15px;
  font-weight: 400;
  text-align: center;
  padding: 20px;
  flex: 1;
`
export default function PostList() {
  const api = useApi()
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState(null)
  const [isCreatingPost, setIsCreatingPost] = useState(false)

  const handleLoad = () => {
    setError(null)
    setIsLoading(true)
    api.get('/posts')
      .then(result => setPosts(result.data.posts))
      .catch(setError)
      .finally(() => setIsLoading(false))
  }
  useEffect(handleLoad, [])

  return (
    <Wrapper>
      <List
        refreshing={isLoading}
        onRefresh={handleLoad}
        data={posts}
        keyExtractor={post => post.id}
        ListEmptyComponent={() => <InfoText>SEM POSTS</InfoText>}
        ListHeaderComponent={error ? () => <ErrorPresent error={error} onReload={handleLoad} /> : undefined}
        renderItem={({ item: post }) => <Post {...post} onPress={() => setSelectedPost(post)} />}
      />
      <FloatingButton icon='pencil-plus' onPress={() => setIsCreatingPost(true)} />
      <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} onRefreshNecessary={handleLoad} />
      <PostCreateModal isVisible={isCreatingPost} onClose={() => setIsCreatingPost(false)} onRefreshNecessary={handleLoad} />
    </Wrapper>
  )
}
