import axios from 'axios';
import p1 from "./../Image/P1.jpeg"
import p2 from "./../Image/P2.jpeg"
import p4 from "./../Image/P4.jpeg"
import p5 from "./../Image/P5.jpeg"
import p6 from "./../Image/P6.jpeg"
import p7 from "./../Image/P7.jpeg"
import w1 from "./../Image/W1.jpeg"

var arr1=[p1, p2, p4, p5, p6];
var arr2  = [p1, p2, p4, p5, p6, p7, w1];


export const fetchAllData = () => async (dispatch) =>{
    try {
        dispatch({ type: 'DATA_REQUEST' });
    
        const { data } = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");
        var newdata = {
            tickets: [],
            users: [],
          };
          data.tickets.forEach((element) => {
            var randomidx = Math.floor(Math.random() * 7);
            newdata.tickets.push({
              id: element.id,
              title: element.title,
              description: element.description,
              priority: element.priority,
              status: element.status,
              userId: element.userId,
              tag: element.tag,
              image: arr2[randomidx],
            //   color: colorList[element.priority],
            });
          });
          data.users.forEach((element) => {
            var randomidx = Math.floor(Math.random() * 5);
            newdata.users.push({
              id: element.id,
              name: element.name,
              img: arr1[randomidx],
            });
          });
        dispatch({ type: 'DATA_SUCCESS', payload: newdata });

    } catch (error) {
        dispatch({ type: 'DATA_FAILURE' });
    }
}

export const selectData = (group, allTickets, orderValue) => async (dispatch) =>{
    try {
        dispatch({ type: 'SELECT_DATA_REQUEST' });

        let user = false;
        let selectedData = [];

        if (group === 'status') {
            const statuses = [...new Set(allTickets.map((ticket) => ticket.status))];

            statuses.forEach((status, index) => {
                const ticketsWithStatus = allTickets.filter((ticket) => ticket.status === status);
                selectedData.push({
                    [index]: {
                        title: status,
                        value: ticketsWithStatus
                    }
                });
            });
        } else if (group === 'user') {
            user = true;
            allTickets.allUser.forEach((user, index) => {
                const ticketsForUser = allTickets.allTickets.filter((ticket) => ticket.userId === user.id);
                selectedData.push({
                    [index]: {
                        title: user.name,
                        value: ticketsForUser,
                        img : user.img
                    }
                });
            });
        } else {
            const priorityList = ["No priority", "Low", "Medium", "High", "Urgent"];
            priorityList.forEach((priority, index) => {
                const ticketsWithPriority = allTickets.filter((ticket) => index === ticket.priority);
                selectedData.push({
                    [index]: {
                        title: priority,
                        value: ticketsWithPriority
                    }
                });
            });
        }

        if (orderValue === "title") {
            selectedData.forEach((group, index) => {
                group[index].value.sort((a, b) => a.title.localeCompare(b.title));
            });
        }

        if (orderValue === "priority") {
            selectedData.forEach((group, index) => {
                group[index].value.sort((a, b) => b.priority - a.priority);
            });
        }
        
        dispatch({ type: 'SELECT_DATA_SUCCESS', payload: { selectedData, user } });

    } catch (error) {
        dispatch({ type: 'SELECT_DATA_FAILURE', payload: error.message });
    }
}
