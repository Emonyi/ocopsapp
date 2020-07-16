<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Poll;

class PollsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $polls = Poll::orderBy('created_at', 'desc')->paginate(10);
        return $polls;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $polls = Poll::all();
        return $polls;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'poll' => 'required',
            'topic' => 'required',
            'purpose' => 'required'
        ]);

        $poll = new Poll();
        $poll->poll = $request->input('poll');
        $poll->topic = $request->input('topic');
        $poll->purpose = $request->input('purpose');
        $poll->save();

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $poll = Poll::find($id);
        return $poll;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'poll' => 'required',
            'topic' => 'required',
            'purpose' => 'required'
        ]);

        $poll = Poll::find($id);
        $poll->poll = $request->input('poll');
        $poll->topic = $request->input('topic');
        $poll->purpose = $request->input('purpose');
        $poll->save();
    }

    public function question($id)
    {
        $poll = Poll::find($id);
        return $poll;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $poll = Poll::find($id);
        $poll->delete();
    }
}
