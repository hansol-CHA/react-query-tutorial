### React Query Tutorial

* useQuery
  - Query 에러 처리하기
  - React Query Devtools 사용
  - Query Cache 기본값 및 적용하기 (cacheTime, staleTime)
  - Refetch 옵션 적용히기 (refetchOnMount, refetchOnWindowFocus)
  - Polling 적용하기 (refetchInterval, refetchIntervalInBackground)
  - useQuery 특정 조건일 때 실행하기 ({ enabled: false })
  - Success and Error callback을 통해 사이트 이펙트 처리하기 (모달 팝업, 페이지 이동 등)
  - 원하는 데이터 형태로 응답받기 (select 옵션)
  - Custom Query Hook 만들기 (onSucess, onError을 인자로 받음)
  - Id을 이용하여 Query 하기 (상세 key 적용)
  - Parallel Queries 적용하기
  - Dynamic Parallel Queries 적용하기 (useQueries hook 사용)
  - Dependent Queries로 서로 의존하는 API 호출하기 ({ enabled : !!조건 })
  - Initial Query Data 데이터 초기값 설정하기 (QueryCLient 사용 - getQueryData메서드)
  - Paginated Queries 처리하기 (useState 및 { keepPreviousData: true } 등을 활용)
  - Infinite Queries 처리하기 (useInfinityQuery hook 사용 - getNextPageParams, hasNextPage, fetchNextPage 등)

* useMutation 
  - Query Invalidation으로 데이터가 업데이트된 경우 자동으로 데이터 fetching 처리 
    (queryClient.invalidateQueries(queryKey), onSuccess 등)
  - queryClient.setQueryData 메서드로 post 후 다시 get 요청 없이 post를 통해 전달 받은 데이터 업데이트
  - onMutate, onError, onSettled 등의 메서드를 사용하여 로컬 데이터 선 업데이트 후 원격 데이터 업데이트 진행

* Axios Interceptor
