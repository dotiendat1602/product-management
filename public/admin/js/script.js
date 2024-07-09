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
        // ở đây hành vi mặc định của form là load lại trang web nên hàm này sẽ ngăn điều đó khi submit
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