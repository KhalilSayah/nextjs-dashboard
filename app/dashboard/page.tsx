import DashboardPage from "@/components/pages/dashboard-page";
import fetchAllDataFromApi from "../lib/api";


export default async function (){
  const data = await fetchAllDataFromApi()
  const transformData = data?.tokens?.data ? Object.keys(data.tokens.data) : []

  return (
    <DashboardPage data={transformData}/>
  )
}