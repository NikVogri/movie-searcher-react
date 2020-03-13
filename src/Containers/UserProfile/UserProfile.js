import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchWatched } from "../../redux/actions/actionCreator";
import ItemList from "../../Components/ItemList/ItemList";

const UserProfile = ({ fetchWatched, userId, items, token }) => {
  useEffect(() => {
    fetchWatched(userId, token);
  }, [fetchWatched, userId]);

  return <div>{items && <ItemList type={"userFetch"} items={items} />}</div>;
};
const mapStateToProps = state => ({
  userId: state.user.userId,
  token: state.user.token,
  items: state.watched.items
});

const mapDispatchToProps = {
  fetchWatched
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
