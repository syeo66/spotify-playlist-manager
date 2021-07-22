import React, { memo, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import styled from 'styled-components'

import { signOut } from '../actions'
import { token, userData } from '../queries'
import breakpoints from '../styles/breakpoints'

const UserInfo: React.FC = () => {
  const queryClient = useQueryClient()
  const { data: accessToken } = useQuery(token.key, token.query)
  const { data, isLoading, isError, error, isFetching } = useQuery(userData.key, userData.query, {
    enabled: !!accessToken,
    refetchInterval: 2000,
    retry: (count: number, { response: { status } }) => count < 3 && status !== 404 && status !== 401,
  })
  const logoff = useMutation(signOut, {
    onSuccess: () => {
      queryClient.invalidateQueries(token.key)
      queryClient.setQueryData(userData.key, () => null)
      queryClient.setQueryData(token.key, () => null)
    },
  })

  useEffect(() => {
    if (
      accessToken &&
      !isFetching &&
      isError &&
      (error as { response?: { status: number } })?.response?.status === 401
    ) {
      logoff.mutate()
    }
  }, [accessToken, error, isError, isFetching, logoff])

  return (
    <>
      {!isLoading && !!data && (
        <ImageContainer>{!!data?.images?.[0]?.url && <Image src={data?.images?.[0]?.url} />}</ImageContainer>
      )}
    </>
  )
}

const ImageContainer = styled.div`
  height: 2rem;
  width: 2rem;
  margin-right: 1rem;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.5);
  @media only screen and (min-width: ${breakpoints.sm}) {
    height: 2.4rem;
    width: 2.4rem;
    margin-right: 1.2rem;
  }
`
const Image = styled.img`
  width: 100%;
`

export default memo(UserInfo)
