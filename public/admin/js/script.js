// Button Status
const listButtonStatus = document.querySelectorAll("[button-status]");
if(listButtonStatus.length > 0){
    let url = new URL(window.location.href);

    // Bắt sự kiện Click
    listButtonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            if(status){
                url.searchParams.set("status", status);
            } else{
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        });
    });

    // Thêm class active mặc định
    const statusCurrent = url.searchParams.get("status") || "";
    const buttonCurrent = document.querySelector(`[button-status="${statusCurrent}"]`);
    if(buttonCurrent){
        buttonCurrent.classList.add("active");
    }
}
// End Button Status

// Form search
const formSearch = document.querySelector("[form-search]");
if(formSearch){
    formSearch.addEventListener("submit", (event) => {
        let url = new URL(window.location.href);

        // Hàm này là hàm ngăn chặn hành vi mặc định của 1 cái gì đó
        // ở đây hành vi mặc định của formsubmit là load lại trang web nên hàm này sẽ ngăn điều đó khi submit
        event.preventDefault();
        const keyword = event.target.elements.keyword.value;
        if(keyword){
            url.searchParams.set("keyword", keyword);
        } else{
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    })
}
// End Form search

// Pagination

const buttonPagination = document.querySelectorAll("[button-pagination]");
if(buttonPagination.length > 0){
    buttonPagination.forEach(button => {
        let url = new URL(window.location.href);

        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            
            url.searchParams.set("page", page);

            window.location.href = url.href;
        });
    });
}

// End pagination


// Button Change Status
const listButtonChangeStatus = document.querySelectorAll("[button-change-status]");
if(listButtonChangeStatus.length > 0){
    listButtonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const link = button.getAttribute("link");
            fetch(link, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(res => res.json())
                .then(data => {
                    if(data.code == 200){
                        window.location.reload();
                    }
                })
        });
    });
}
// End Button Change Status


// Check Item
const inputCheckAll = document.querySelector("input[name='checkAll']");
if(inputCheckAll){
    const listInputCheckItem = document.querySelectorAll("input[name='checkItem']");

    // Bắt sự kiện click vào nút checkAll
    inputCheckAll.addEventListener("click", () => {
        listInputCheckItem.forEach(inputCheckItem => {
            inputCheckItem.checked = inputCheckAll.checked;
        })
    })

    // Bắt sự kiện click vào nút checkItem
    listInputCheckItem.forEach(inputCheckItem => {
        inputCheckItem.addEventListener("click", () => {
            const listInputCheckItemChecked = document.querySelectorAll("input[name='checkItem']:checked");
            if(listInputCheckItem.length == listInputCheckItemChecked.length){
                inputCheckAll.checked = true;
            } else{
                inputCheckAll.checked = false;
            }
        })
    })
}
// End Check Item


// Box Actions
const boxActions = document.querySelector("[box-actions]");
if(boxActions){
    const button = boxActions.querySelector("button");

    button.addEventListener("click", () => {
        const select = boxActions.querySelector("select");
        const status = select.value;

        const listInputChecked = document.querySelectorAll("input[name='checkItem']:checked");
        const ids = [];
        listInputChecked.forEach(input => {
            ids.push(input.value);
        });
        if(status != "" && ids.length > 0){
            const dataChangeMulti = {
                status: status,
                ids: ids
            };
            const link = boxActions.getAttribute("box-actions");
            fetch(link, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataChangeMulti),
            })
                .then(res => res.json())
                .then(data => {
                    if(data.code == 200){
                        window.location.reload();
                    }
                })
        } else{
            alert('Hành động và checkItem phải được chọn!');
        }
    })
}
// End Box Actions


// Xóa mềm bản ghi
const listButtonDelete = document.querySelectorAll("[button-delete]");
console.log(listButtonDelete);
if(listButtonDelete.length > 0){
    listButtonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const link = button.getAttribute("button-delete");

            fetch(link, {
                method: "PATCH"
            })
                .then(res => res.json())
                .then(data => {
                    if(data.code == 200){
                        window.location.reload();
                    }
                })
        });
    });
}
//End Xóa mềm bản ghi


// Khôi phục bản ghi
const listButtonRestore = document.querySelectorAll("[button-restore]");
if(listButtonRestore.length > 0){
    listButtonRestore.forEach(button => {
        button.addEventListener("click", () => {
            const link = button.getAttribute("button-restore");

            fetch(link, {
                method: "PATCH"
            })
                .then(res => res.json())
                .then(data => {
                    if(data.code == 200){
                        window.location.reload();
                    }
                })
        });
    });
}
// End Khôi phục bản ghi


// Xóa vĩnh viễn bản ghi
const listButtonDeletePermanently = document.querySelectorAll("[button-delete-permanently]");
if(listButtonDeletePermanently.length > 0){
    listButtonDeletePermanently.forEach(button => {
        button.addEventListener("click", () => {
            const link = button.getAttribute("button-delete-permanently");

            fetch(link, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if(data.code == 200){
                        window.location.reload();
                    }
                })
        });
    });
}
// End Xóa vĩnh viễn bản ghi


// Thay đổi vị trí
const listInputPosition = document.querySelectorAll("input[name='position']");
if(listInputPosition.length > 0){
    listInputPosition.forEach(input => {
        input.addEventListener("change", () => {
            const position = parseInt(input.value);
            const link = input.getAttribute("link");
            fetch(link, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    position: position
                })
            })
                .then(res => res.json())
                .then(data => {
                    if(data.code == 200){
                        console.log(data);
                    }
                })
        })
    })
}
// End Thay đổi vị trí


// show-alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
  let time = showAlert.getAttribute("show-alert") || 3000;
  time = parseInt(time);

  setTimeout(() => {
    showAlert.classList.add("hidden");
  }, time);
}
// End show-alert


// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", () => {
        const file = uploadImageInput.files[0];
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    })
}
// End Upload Image


// Sort
const sort = document.querySelector("[sort]");
if(sort){
    let url = new URL(window.location.href);

    const select = sort.querySelector("[sort-select]");
    select.addEventListener("change", () => {
        const [sortKey, sortValue] = select.value.split("-");
        
        if(sortKey && sortValue){
            url.searchParams.set("sortKey", sortKey);
            url.searchParams.set("sortValue", sortValue);
        }

        window.location.href = url.href;
    })


    // Thêm selected mặc định cho option đã chọn
    const defaultSortKey = url.searchParams.get("sortKey");
    const defaultValue = url.searchParams.get("sortValue");
    if(defaultSortKey && defaultValue){
        const optionSelected = select.querySelector(`option[value="${defaultSortKey}-${defaultValue}"]`);
        // optionSelected.selected = true;
        optionSelected.setAttribute("selected", true);
    }

    // Tính năng clear
    const buttonClear = sort.querySelector("[sort-clear]");
    if(buttonClear){
        buttonClear.addEventListener("click", () => {
            url.searchParams.delete("sortKey");
            url.searchParams.delete("sortValue");

            window.location.href = url.href;
        })
    }
}
// End Sort

// Phân quyền
const tablePermissions = document.querySelector("[table-permissions]");
if(tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]");
  buttonSubmit.addEventListener("click", () => {
    const roles = [];

    const listElementRoleId = tablePermissions.querySelectorAll("[role-id]");
    for (const element of listElementRoleId) {
      const roleId = element.getAttribute("role-id");
      const role = {
        id: roleId,
        permissions: []
      };

      const listInputChecked = tablePermissions.querySelectorAll(`input[data-id="${roleId}"]:checked`);

      listInputChecked.forEach(input => {
        const dataName = input.getAttribute("data-name");
        role.permissions.push(dataName);
      });

      roles.push(role);
    }

    const path = buttonSubmit.getAttribute("button-submit");

    fetch(path, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roles)
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  });
}
// Hết Phân quyền