import { 
  useGetMemberLevelQuery, 
  useGetCommissionBalanceQuery,
  useGetPendingCommissionQuery,
  useGetMemberNextLevelQuery,
  useGetMemberSalesRankQuery,
  useGetMemberBadgeQuery,
  useGetMemberChallengeQuery,
  useGetMemberCurriculumQuery
} from "@/store/api/member/query";
import MemberLevelsCard from "../MemberLevels/MemberLevelsList/MemberLevelCard";
import CommissionBalanceWidget from "./CommissionBalance";
import PendingCommissionWidget from "./PendingCommission";
import AccomplishmentsWidget from "./Accomplishments";
import SalesRankWidget from "./SalesRank";
import CurriculumWidget from "./Curriculum";
import LeaderBoardWidget from "./LeaderBoard";

const MemberDashboardPage = () => {
  const { data: memberLevel, isError: levelErr } = useGetMemberLevelQuery(
    undefined, {refetchOnMountOrArgChange: true}
  );

  const { data: memberBalance } = useGetCommissionBalanceQuery(
    undefined, {refetchOnMountOrArgChange: true}
  );

  const { data: memberPending } = useGetPendingCommissionQuery(
    undefined, {refetchOnMountOrArgChange: true}
  );

  const { data: memberNextLevel, isError: nextLevelErr } = useGetMemberNextLevelQuery(
    undefined, {refetchOnMountOrArgChange: true}
  );

  const { data: memberBadge } = useGetMemberBadgeQuery(
    undefined, {refetchOnMountOrArgChange: true}
  );

  const { data: memberChallenge } = useGetMemberChallengeQuery(
    undefined, {refetchOnMountOrArgChange: true}
  );

  const { data: memberSalesRank } = useGetMemberSalesRankQuery(
    undefined, {refetchOnMountOrArgChange: true}
  );

  const { data: memberCurriculum } = useGetMemberCurriculumQuery(
    undefined, {refetchOnMountOrArgChange: true}
  );

  return (
    <div className="p-4 bg-neutral-2 min-h-[calc(100vh-100px)] flex flex-col justify-between">
      <div>
        <div className="mx-auto grid grid-cols-3 gap-4">
          <div className="grid gap-4 h-fit">
            {!levelErr && memberLevel && 
            <MemberLevelsCard memberLevelCard={memberLevel} cardTitle="Current Level" />
            }
            {!nextLevelErr && memberNextLevel && 
            <MemberLevelsCard memberLevelCard={memberNextLevel} cardTitle="Next Level" />
            }
            {memberSalesRank && <SalesRankWidget salesInfo={memberSalesRank} />}
          </div>
          <div className="grid gap-4 h-fit">
            {memberBalance && <CommissionBalanceWidget commissionBalance={memberBalance} />}
            {memberPending && <PendingCommissionWidget pendingCommission={memberPending} />}
            <CurriculumWidget curriculum={memberCurriculum} />
          </div>
          <div className="grid gap-4 h-fit">
            <AccomplishmentsWidget
              list={memberBadge || []}
              title="Badges Earned:"
            />
            <AccomplishmentsWidget
              list={memberChallenge || []}
              title="Challenges Archieved:"
            />
            <LeaderBoardWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboardPage;
