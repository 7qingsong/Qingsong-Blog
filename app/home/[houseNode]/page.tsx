export default async function HouseNode( {params}: {params: {houseNode: number}} ){
  const {houseNode} = await params
  return (
    <div>
      <h1>House Node: {houseNode}</h1>
    </div>
  )
}