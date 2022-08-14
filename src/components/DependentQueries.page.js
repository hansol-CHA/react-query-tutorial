import { useQuery } from "react-query";
import axios from "axios";

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export default function DependentQueriesPage({ email }) {
  const { data: user } = useQuery(["user", email], () =>
    fetchUserByEmail(email)
  );
  const channelId = user?.data.channelId;

  const { data: channel } = useQuery(
    ["channel", channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId,
    }
  );

  const courses = channel?.data.courses;

  return (
    <>
      <div>DependentQueries</div>
      {courses?.map((course) => (
        <div key={course}>{course}</div>
      ))}
    </>
  );
}
