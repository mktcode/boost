import { computed, ref } from 'vue'
import { createClient } from 'urql'

const graphClient = createClient({
  url: 'https://api.studio.thegraph.com/query/12054/boost/v0.0.9',
})

const BOOSTS_QUERY = `
  query {
    boosts {
      id
      ref
      token
      owner
      balance
      amountPerAccount
    }
  }
`

const boosts = ref<{
  id: string
  ref: string,
  token: string,
  owner: string,
  balance: string,
  amountPerAccount: string
}[]>([])

const loadBoosts = async () => {
  const res = await graphClient.query(BOOSTS_QUERY).toPromise()
  boosts.value = [...res.data.boosts, ...res.data.boosts, ...res.data.boosts]
}

export const listBoosts = () => ({ boosts, loadBoosts })