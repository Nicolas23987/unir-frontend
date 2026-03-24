import { Navbar } from "@/components/voting/navbar"
import { VotingHero } from "@/components/voting/voting-hero"
import { CandidatesGrid } from "@/components/voting/candidates-grid"
import { VotingStats } from "@/components/voting/voting-stats"
import { CommentsSection } from "@/components/voting/comments-section"

export default function ReinaEnfermeriaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <VotingHero />
        <VotingStats />
        <CandidatesGrid />
        <CommentsSection />
      </main>
    </>
  )
}
