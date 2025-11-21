
document.addEventListener('DOMContentLoaded', () => {
    
    
    document.querySelectorAll('.card-content-wrapper').forEach(wrapper => {
        wrapper.style.maxHeight = '0';
        
    });

    
    document.querySelectorAll('.toggle-button').forEach(button => {
        button.addEventListener('click', () => {
            const contentWrapper = button.nextElementSibling; 
            const arrow = button.querySelector('.arrow');

            if (contentWrapper.style.maxHeight !== '0px' && contentWrapper.style.maxHeight) {
                
                contentWrapper.style.maxHeight = '0';
                arrow.style.transform = 'rotate(0deg)';
            } else {
                
                
                
                
                document.querySelectorAll('.card-content-wrapper').forEach(w => {
                    if (w !== contentWrapper && w.style.maxHeight !== '0px') {
                        w.style.maxHeight = '0';
                        w.previousElementSibling.querySelector('.arrow').style.transform = 'rotate(0deg)';
                    }
                });

                
                contentWrapper.style.maxHeight = contentWrapper.scrollHeight + 'px';
                arrow.style.transform = 'rotate(180deg)';
            }
        });
    });
});