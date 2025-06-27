function handlePrepChange(select) {
    const coachingField = document.getElementById('coachingField');
    if (select.value === 'coaching') {
        coachingField.style.display = 'block';
        document.getElementById('coaching').required = true;
    } else {
        coachingField.style.display = 'none';
        document.getElementById('coaching').required = false;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('address').placeholder = 'City, State';

    const form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();
        const address = document.getElementById('address').value.trim();
        const nimcet = document.getElementById('nimcet').value.trim();
        const prep = document.getElementById('prep').value;
        const coaching = document.getElementById('coaching').value.trim();

        if (!name || !whatsapp || !address || !nimcet || !prep || (prep === 'coaching' && !coaching)) {
            alert('All fields are compulsory.');
            return;
        }

        if (!/^\d{10}$/.test(whatsapp)) {
            alert('Whatsapp No. should be exactly 10 digits.');
            return;
        }

        const nimcetNum = Number(nimcet);
        if (isNaN(nimcetNum) || nimcetNum < 0 || nimcetNum > 1000) {
            alert('NIMCET Score should be between 0 and 1000.');
            return;
        }

        if (prep === 'coaching' && !coaching) {
            alert('Please enter the Coaching Name.');
            return;
        }

        const coachingOrSelf = prep === 'self' ? 'Self' : coaching;

        fetch('https://sheetdb.io/api/v1/p3xwk30ixniku', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: [
                    {
                        'name': name,
                        'whatsapp': whatsapp,
                        'address': address,
                        'nimcet': nimcet,
                        'coaching_self': coachingOrSelf
                    }
                ]
            })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            alert('Form submitted successfully!');
            form.reset();
            handlePrepChange(document.getElementById('prep'));
        })
        .catch((error) => {
            console.error(error);
            alert('There was an error submitting the form.');
        });
    });
});