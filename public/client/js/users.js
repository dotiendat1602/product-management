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