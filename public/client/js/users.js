// Chức năng gửi yêu cầu
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if(listBtnAddFriend.length > 0) {
  listBtnAddFriend.forEach(button => {
    button.addEventListener("click", () => {
      // Việc 1: Thêm class "add" cho box-user
      button.closest(".box-user").classList.add("add");
      // closest: Tìm thẻ cha gần nhất có class là box-user

      // Việc 2: Gửi lên server userIdB
      const userIdB = button.getAttribute("btn-add-friend");
      socket.emit("CLIENT_ADD_FRIEND", userIdB);
    })
  })
}
// Hết Chức năng gửi yêu cầu

// Chức năng hủy gửi yêu
const listBtnCancelAddFriend = document.querySelectorAll("[btn-cancel-friend]");
if(listBtnCancelAddFriend.length > 0) {
    listBtnCancelAddFriend.forEach(button => {
    button.addEventListener("click", () => {
      // Việc 1: Xóa class "add" khỏi box-user
      button.closest(".box-user").classList.remove("add");
      // closest: Tìm thẻ cha gần nhất có class là box-user

      // Việc 2: Gửi lên server userIdB
      const userIdB = button.getAttribute("btn-cancel-friend");
      socket.emit("CLIENT_CANCEL_FRIEND", userIdB);
    })
  })
}
// Hết Chức năng hủy gửi yêu cầu

// Chức năng từ chối kết bạn
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if(listBtnRefuseFriend.length > 0) {
    listBtnRefuseFriend.forEach(button => {
    button.addEventListener("click", () => {
      // Việc 1: Thêm class "refuse" trong box-user
      button.closest(".box-user").classList.add("refuse");
      // closest: Tìm thẻ cha gần nhất có class là box-user

      // Việc 2: Gửi lên server userIdB
      const userIdB = button.getAttribute("btn-refuse-friend");
      socket.emit("CLIENT_REFUSE_FRIEND", userIdB);
    })
  })
}
// Hết Chức năng từ chối kết bạn

// Chức năng chấp nhận kết bạn
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if(listBtnAcceptFriend.length > 0) {
  listBtnAcceptFriend.forEach(button => {
    button.addEventListener("click", () => {
      // Việc 1: Thêm class "accepted" trong box-user
      button.closest(".box-user").classList.add("accepted");
      // closest: Tìm thẻ cha gần nhất có class là box-user

      // Việc 2: Gửi lên server userIdB
      const userIdB = button.getAttribute("btn-accept-friend");
      socket.emit("CLIENT_ACCEPT_FRIEND", userIdB);
    })
  })
}
// Chức năng chấp nhận kết bạn

// SERVER_RETURN_LENGTH_ACCEPT_FRIEND
socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
  const badgeUsersAccept = document.querySelector(`[badge-users-accept="${data.userId}"]`);
  if(badgeUsersAccept) {
    badgeUsersAccept.innerHTML = data.length;
  }
})
// End SERVER_RETURN_LENGTH_ACCEPT_FRIEND