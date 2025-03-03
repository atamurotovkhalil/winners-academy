import CommunityCard from '../Card/CommunityCard'


const FreeSharing = () => {
  return (
    <div className="grid gap-3  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
      </div>
  )
}

export default FreeSharing