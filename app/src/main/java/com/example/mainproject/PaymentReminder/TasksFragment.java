package com.example.mainproject.PaymentReminder;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import com.example.mainproject.R;


public class TasksFragment extends Fragment {



    public TasksFragment() {
        // Required empty public constructor
    }

    private ListView taskList;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_tasks, container, false);

        taskList = (ListView)view.findViewById(R.id.task_list);
        com.example.mainproject.PaymentReminder.TaskListAdapter taskListAdapter = listener.getTaskListAdapter();
        taskList.setAdapter(taskListAdapter);
        //taskList.setOnItemClickListener(listOnItemClickListener); // making it editable
        registerForContextMenu(taskList); // choose edit or delete

        return view;
    }
    interface OnFragmentInteractionListener {
        com.example.mainproject.PaymentReminder.TaskListAdapter getTaskListAdapter();
        void onFragmentInteraction(int position);
    }

    OnFragmentInteractionListener listener;
    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
        //Log.d("!!!!!", context.getClass().getName());
        try {
            listener = (OnFragmentInteractionListener) context;
        } catch (ClassCastException e) {
            throw new ClassCastException(context.toString()
                    + " should implement interface OnFragmentInteractionListener");
        }
    }

    private AdapterView.OnItemClickListener onItemClickListener = new AdapterView.OnItemClickListener()
    {
        public void onItemClick(AdapterView<?> parent, View view, int position, long id)
        {
            listener.onFragmentInteraction(position);
        }
    };
}