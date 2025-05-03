export function HackathonCard({ hackathon }: { hackathon: any }) {
    return (
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium text-lg mb-2">{hackathon.name}</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4" checked readOnly />
            <span>Virtual hackathon</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4" checked readOnly />
            <span>{hackathon.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4" checked readOnly />
            <span>{hackathon.participants.toLocaleString()} Participants</span>
          </div>
        </div>
      </div>
    )
  }