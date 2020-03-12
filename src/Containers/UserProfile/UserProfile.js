import React, { useEffect } from "react";
import { connect } from "react-redux";
import Item from "../../Components/Item/Item";
import { fetchWatched } from "../../redux/actions/actionCreator";
const UserProfile = ({ fetchWatched, userId, items }) => {
  useEffect(() => {
    fetchWatched(userId);
  }, [fetchWatched, userId]);
  console.log(items);

  return (
    <div>
      {items ? (
        items.map(item => (
          <Item
            key={item.contentId}
            type={item.contentType}
            id={item.contentId}
            image={item.imagePath}
            title={item.name}
          />
        ))
      ) : (
        <p>No items added yet </p>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  userId: state.user.userId,
  items: state.watched.items
});

const mapDispatchToProps = {
  fetchWatched
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
